Pod::Spec.new do |s|
  s.name = 'LiveActivitiesKit'
  s.version = '7.0.0'
  s.summary = 'A Swift framework used by capacitor-live-activities for creating dynamic Live Activities layouts'
  s.license = 'MIT'
  s.homepage = 'https://github.com/ludufre/capacitor-live-activities'
  s.author = { 'Luan Freitas' => 'ludufre@gmail.com' }
  s.source = { :git => 'https://github.com/ludufre/capacitor-live-activities.git', :tag => s.version.to_s }
  s.source_files = 'ios/LiveActivitiesKit/**/*.{swift,h,m,c,cc,mm,cpp}'
  s.public_header_files = 'ios/LiveActivitiesKit/*.h'

  s.ios.deployment_target = '14.0'
  s.swift_version = '5.1'
  
  # Frameworks condicionais - ActivityKit apenas para iOS 16.2+
  s.weak_frameworks = 'WidgetKit', 'SwiftUI', 'ActivityKit'
end