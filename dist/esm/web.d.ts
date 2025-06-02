import { WebPlugin } from '@capacitor/core';
import type { ActivityInfo, EndActivityOptions, LiveActivitiesOptions, LiveActivitiesPlugin, UpdateActivityOptions } from './definitions';
export declare class LiveActivitiesWeb extends WebPlugin implements LiveActivitiesPlugin {
    startActivity(_: LiveActivitiesOptions): Promise<{
        activityId: string;
    }>;
    updateActivity(_: UpdateActivityOptions): Promise<void>;
    endActivity(_: EndActivityOptions): Promise<void>;
    getAllActivities(): Promise<{
        activities: ActivityInfo[];
    }>;
    debugActivities(): Promise<{
        activities: ActivityInfo[];
        count: number;
    }>;
    saveImage(_: {
        imageData: string;
        name: string;
        compressionQuality?: number;
    }): Promise<{
        success: boolean;
        imageName: string;
    }>;
    removeImage(_: {
        name: string;
    }): Promise<{
        success: boolean;
    }>;
    listImages(): Promise<{
        images: string[];
    }>;
    cleanupImages(): Promise<void>;
}
