//
//  LiveActivitiesBundle.swift
//  LiveActivities
//
//  Created by Luan on 08/06/25.
//

import WidgetKit
import SwiftUI
import LiveActivitiesKit

@main
struct LiveActivitiesBundle: WidgetBundle {
  var body: some Widget {
    LiveActivities()
    DynamicActivityWidget()
  }
}
