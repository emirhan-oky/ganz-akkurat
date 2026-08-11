import Foundation
import AVFoundation
import AppKit
import CoreText
import CoreVideo

let project = URL(fileURLWithPath: FileManager.default.currentDirectoryPath)
    .appendingPathComponent("setupklar-prototyp")
let backgroundURL = project.appendingPathComponent("assets/setup-background.png")
let narrationURL = project.appendingPathComponent("assets/narration.aiff")
let silentURL = project.appendingPathComponent("output/setupklar-sample-silent.mp4")
let finalURL = project.appendingPathComponent("output/setupklar-beispielvideo.mp4")

let width = 1080
let height = 1920
let fps: Int32 = 30
let duration = 19.8
let frameCount = Int(duration * Double(fps))

try? FileManager.default.removeItem(at: silentURL)
try? FileManager.default.removeItem(at: finalURL)

guard let nsImage = NSImage(contentsOf: backgroundURL),
      let background = nsImage.cgImage(forProposedRect: nil, context: nil, hints: nil) else {
    fatalError("Background image could not be loaded")
}

func color(_ hex: UInt32, alpha: CGFloat = 1) -> CGColor {
    CGColor(
        red: CGFloat((hex >> 16) & 0xff) / 255,
        green: CGFloat((hex >> 8) & 0xff) / 255,
        blue: CGFloat(hex & 0xff) / 255,
        alpha: alpha
    )
}

func ease(_ value: Double) -> CGFloat {
    let x = max(0, min(1, value))
    return CGFloat(x * x * (3 - 2 * x))
}

func segmentOpacity(_ time: Double, start: Double, end: Double, fade: Double = 0.28) -> CGFloat {
    if time < start || time > end { return 0 }
    if time < start + fade { return ease((time - start) / fade) }
    if time > end - fade { return ease((end - time) / fade) }
    return 1
}

func roundedRect(_ ctx: CGContext, rect: CGRect, radius: CGFloat, fill: CGColor) {
    ctx.saveGState()
    ctx.setFillColor(fill)
    ctx.addPath(CGPath(roundedRect: rect, cornerWidth: radius, cornerHeight: radius, transform: nil))
    ctx.fillPath()
    ctx.restoreGState()
}

func drawCenteredLines(
    _ ctx: CGContext,
    lines: [String],
    centerY: CGFloat,
    size: CGFloat,
    fill: CGColor,
    alpha: CGFloat,
    lineGap: CGFloat = 18
) {
    guard alpha > 0 else { return }
    ctx.saveGState()
    ctx.setAlpha(alpha)
    let font = CTFontCreateWithName("Arial-BoldMT" as CFString, size, nil)
    let totalHeight = CGFloat(lines.count) * size + CGFloat(max(0, lines.count - 1)) * lineGap
    var baseline = centerY + totalHeight / 2 - size * 0.83

    for lineText in lines {
        let attributes: [NSAttributedString.Key: Any] = [
            .font: font,
            .foregroundColor: fill
        ]
        let attributed = NSAttributedString(string: lineText, attributes: attributes)
        let line = CTLineCreateWithAttributedString(attributed)
        let bounds = CTLineGetBoundsWithOptions(line, [.useGlyphPathBounds, .excludeTypographicLeading])
        ctx.textPosition = CGPoint(x: (CGFloat(width) - bounds.width) / 2 - bounds.minX, y: baseline)
        CTLineDraw(line, ctx)
        baseline -= size + lineGap
    }
    ctx.restoreGState()
}

func drawSmallText(_ ctx: CGContext, text: String, x: CGFloat, y: CGFloat, size: CGFloat, fill: CGColor, alpha: CGFloat = 1) {
    ctx.saveGState()
    ctx.setAlpha(alpha)
    let font = CTFontCreateWithName("Arial-BoldMT" as CFString, size, nil)
    let attributes: [NSAttributedString.Key: Any] = [
        .font: font,
        .foregroundColor: fill
    ]
    let line = CTLineCreateWithAttributedString(NSAttributedString(string: text, attributes: attributes))
    ctx.textPosition = CGPoint(x: x, y: y)
    CTLineDraw(line, ctx)
    ctx.restoreGState()
}

let writer = try AVAssetWriter(outputURL: silentURL, fileType: .mp4)
let videoSettings: [String: Any] = [
    AVVideoCodecKey: AVVideoCodecType.h264,
    AVVideoWidthKey: width,
    AVVideoHeightKey: height,
    AVVideoCompressionPropertiesKey: [
        AVVideoAverageBitRateKey: 6_500_000,
        AVVideoProfileLevelKey: AVVideoProfileLevelH264HighAutoLevel
    ]
]
let input = AVAssetWriterInput(mediaType: .video, outputSettings: videoSettings)
input.expectsMediaDataInRealTime = false
let attributes: [String: Any] = [
    kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA,
    kCVPixelBufferWidthKey as String: width,
    kCVPixelBufferHeightKey as String: height,
    kCVPixelBufferIOSurfacePropertiesKey as String: [:]
]
let adaptor = AVAssetWriterInputPixelBufferAdaptor(assetWriterInput: input, sourcePixelBufferAttributes: attributes)
guard writer.canAdd(input) else { fatalError("Cannot add video input") }
writer.add(input)
writer.startWriting()
writer.startSession(atSourceTime: .zero)

for frame in 0..<frameCount {
    autoreleasepool {
        while !input.isReadyForMoreMediaData { Thread.sleep(forTimeInterval: 0.002) }
        var optionalBuffer: CVPixelBuffer?
        let bufferAttributes: [String: Any] = [
            kCVPixelBufferCGImageCompatibilityKey as String: true,
            kCVPixelBufferCGBitmapContextCompatibilityKey as String: true
        ]
        CVPixelBufferCreate(
            nil,
            width,
            height,
            kCVPixelFormatType_32BGRA,
            bufferAttributes as CFDictionary,
            &optionalBuffer
        )
        guard let pixelBuffer = optionalBuffer else { fatalError("Could not create pixel buffer") }

        CVPixelBufferLockBaseAddress(pixelBuffer, [])
        defer { CVPixelBufferUnlockBaseAddress(pixelBuffer, []) }
        guard let base = CVPixelBufferGetBaseAddress(pixelBuffer) else { fatalError("No base address") }
        let bytesPerRow = CVPixelBufferGetBytesPerRow(pixelBuffer)
        guard let ctx = CGContext(
            data: base,
            width: width,
            height: height,
            bitsPerComponent: 8,
            bytesPerRow: bytesPerRow,
            space: CGColorSpaceCreateDeviceRGB(),
            bitmapInfo: CGImageAlphaInfo.premultipliedFirst.rawValue | CGBitmapInfo.byteOrder32Little.rawValue
        ) else { fatalError("Could not create graphics context") }

        let t = Double(frame) / Double(fps)
        ctx.setFillColor(color(0x07111f))
        ctx.fill(CGRect(x: 0, y: 0, width: width, height: height))

        // Subtle push-in on the generated setup photo.
        let zoom = 1.0 + 0.045 * (t / duration)
        let drawW = CGFloat(width) * zoom
        let drawH = CGFloat(height) * zoom
        let imageRect = CGRect(
            x: (CGFloat(width) - drawW) / 2,
            y: (CGFloat(height) - drawH) / 2 - CGFloat(t / duration) * 22,
            width: drawW,
            height: drawH
        )
        ctx.draw(background, in: imageRect)

        // Readability layers.
        let gradient = CGGradient(
            colorsSpace: CGColorSpaceCreateDeviceRGB(),
            colors: [color(0x020711, alpha: 0.93), color(0x020711, alpha: 0.16), color(0x020711, alpha: 0.72)] as CFArray,
            locations: [0, 0.50, 1]
        )!
        ctx.drawLinearGradient(gradient, start: CGPoint(x: 0, y: height), end: CGPoint(x: 0, y: 0), options: [])

        // Brand chip.
        roundedRect(ctx, rect: CGRect(x: 70, y: 1770, width: 300, height: 72), radius: 36, fill: color(0x07111f, alpha: 0.88))
        ctx.setFillColor(color(0x24d8ff))
        ctx.fillEllipse(in: CGRect(x: 98, y: 1792, width: 28, height: 28))
        drawSmallText(ctx, text: "SETUPKLAR", x: 145, y: 1794, size: 34, fill: color(0xffffff))

        // Timed headline scenes.
        let o1 = segmentOpacity(t, start: 0.0, end: 3.4)
        if o1 > 0 {
            roundedRect(ctx, rect: CGRect(x: 70, y: 1210, width: 940, height: 390), radius: 42, fill: color(0x06101d, alpha: 0.78 * o1))
            drawCenteredLines(ctx, lines: ["DUAL DISPLAY", "≠ ZWEI MONITORE?"], centerY: 1395, size: 92, fill: color(0xffffff), alpha: o1, lineGap: 28)
            roundedRect(ctx, rect: CGRect(x: 330, y: 1175, width: 420, height: 12), radius: 6, fill: color(0x24d8ff, alpha: o1))
        }

        let o2 = segmentOpacity(t, start: 3.2, end: 7.2)
        if o2 > 0 {
            roundedRect(ctx, rect: CGRect(x: 85, y: 1250, width: 910, height: 315), radius: 42, fill: color(0x06101d, alpha: 0.80 * o2))
            drawCenteredLines(ctx, lines: ["USB-C IST NUR", "DIE STECKERFORM."], centerY: 1400, size: 82, fill: color(0xffffff), alpha: o2, lineGap: 26)
        }

        let o3 = segmentOpacity(t, start: 7.0, end: 13.7)
        if o3 > 0 {
            roundedRect(ctx, rect: CGRect(x: 70, y: 1150, width: 940, height: 470), radius: 42, fill: color(0x06101d, alpha: 0.84 * o3))
            drawCenteredLines(ctx, lines: ["PRÜFE VOR DEM KAUF"], centerY: 1530, size: 56, fill: color(0x24d8ff), alpha: o3)
            let items = ["1  NOTEBOOK-MODELL", "2  ANSCHLUSSSTANDARD", "3  DISPLAYLINK JA/NEIN"]
            for (index, item) in items.enumerated() {
                let rowY = CGFloat(1415 - index * 105)
                roundedRect(ctx, rect: CGRect(x: 130, y: rowY - 24, width: 820, height: 82), radius: 22, fill: color(0xffffff, alpha: 0.10 * o3))
                drawSmallText(ctx, text: item, x: 175, y: rowY, size: 42, fill: color(0xffffff), alpha: o3)
            }
        }

        let o4 = segmentOpacity(t, start: 13.5, end: 17.3)
        if o4 > 0 {
            roundedRect(ctx, rect: CGRect(x: 70, y: 1220, width: 940, height: 355), radius: 42, fill: color(0x06101d, alpha: 0.82 * o4))
            drawCenteredLines(ctx, lines: ["3 ANGABEN PRÜFEN.", "FEHLKAUF VERMEIDEN."], centerY: 1395, size: 76, fill: color(0xffffff), alpha: o4, lineGap: 26)
        }

        let o5 = segmentOpacity(t, start: 17.0, end: duration, fade: 0.35)
        if o5 > 0 {
            ctx.setFillColor(color(0x04101e, alpha: 0.90 * o5))
            ctx.fill(CGRect(x: 0, y: 0, width: width, height: height))
            ctx.setFillColor(color(0x24d8ff, alpha: o5))
            ctx.fillEllipse(in: CGRect(x: 490, y: 1390, width: 100, height: 100))
            drawCenteredLines(ctx, lines: ["SETUPKLAR"], centerY: 1255, size: 105, fill: color(0xffffff), alpha: o5)
            drawCenteredLines(ctx, lines: ["TECHNIK, DIE WIRKLICH", "ZUSAMMENPASST."], centerY: 1055, size: 47, fill: color(0x9defff), alpha: o5, lineGap: 14)
        }

        // Progress line.
        roundedRect(ctx, rect: CGRect(x: 70, y: 78, width: 940, height: 12), radius: 6, fill: color(0xffffff, alpha: 0.22))
        roundedRect(ctx, rect: CGRect(x: 70, y: 78, width: 940 * CGFloat(t / duration), height: 12), radius: 6, fill: color(0x24d8ff))

        let presentationTime = CMTime(value: CMTimeValue(frame), timescale: fps)
        if !adaptor.append(pixelBuffer, withPresentationTime: presentationTime) {
            fatalError("Could not append frame \(frame): \(writer.error?.localizedDescription ?? "unknown")")
        }
    }
}

input.markAsFinished()
let finishSemaphore = DispatchSemaphore(value: 0)
writer.finishWriting { finishSemaphore.signal() }
finishSemaphore.wait()
guard writer.status == .completed else {
    fatalError("Video writing failed: \(writer.error?.localizedDescription ?? "unknown")")
}

// Merge the locally generated German narration with the silent visual track.
let composition = AVMutableComposition()
let videoAsset = AVURLAsset(url: silentURL)
let audioAsset = AVURLAsset(url: narrationURL)
guard let sourceVideo = videoAsset.tracks(withMediaType: .video).first,
      let videoTrack = composition.addMutableTrack(withMediaType: .video, preferredTrackID: kCMPersistentTrackID_Invalid) else {
    fatalError("Could not create video composition track")
}
try videoTrack.insertTimeRange(CMTimeRange(start: .zero, duration: videoAsset.duration), of: sourceVideo, at: .zero)
videoTrack.preferredTransform = sourceVideo.preferredTransform

if let sourceAudio = audioAsset.tracks(withMediaType: .audio).first,
   let audioTrack = composition.addMutableTrack(withMediaType: .audio, preferredTrackID: kCMPersistentTrackID_Invalid) {
    try audioTrack.insertTimeRange(CMTimeRange(start: .zero, duration: min(audioAsset.duration, videoAsset.duration)), of: sourceAudio, at: .zero)
}

guard let exporter = AVAssetExportSession(asset: composition, presetName: AVAssetExportPresetHighestQuality) else {
    fatalError("Could not create exporter")
}
exporter.outputURL = finalURL
exporter.outputFileType = .mp4
exporter.shouldOptimizeForNetworkUse = true
let exportSemaphore = DispatchSemaphore(value: 0)
exporter.exportAsynchronously { exportSemaphore.signal() }
exportSemaphore.wait()

guard exporter.status == .completed else {
    fatalError("Export failed: \(exporter.error?.localizedDescription ?? "unknown")")
}

print(finalURL.path)
