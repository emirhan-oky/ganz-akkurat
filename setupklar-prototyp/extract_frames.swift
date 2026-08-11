import Foundation
import AVFoundation
import AppKit

let root = URL(fileURLWithPath: FileManager.default.currentDirectoryPath).appendingPathComponent("setupklar-prototyp")
let videoURL = root.appendingPathComponent("output/setupklar-beispielvideo.mp4")
let previewDirectory = root.appendingPathComponent("output/previews")
try FileManager.default.createDirectory(at: previewDirectory, withIntermediateDirectories: true)

let asset = AVURLAsset(url: videoURL)
let generator = AVAssetImageGenerator(asset: asset)
generator.appliesPreferredTrackTransform = true
generator.requestedTimeToleranceBefore = .zero
generator.requestedTimeToleranceAfter = .zero

for second in [1.0, 5.0, 10.0, 18.2] {
    let time = CMTime(seconds: second, preferredTimescale: 600)
    let image = try generator.copyCGImage(at: time, actualTime: nil)
    let bitmap = NSBitmapImageRep(cgImage: image)
    guard let png = bitmap.representation(using: .png, properties: [:]) else { continue }
    let name = String(format: "frame-%04.1f.png", second)
    try png.write(to: previewDirectory.appendingPathComponent(name))
}
