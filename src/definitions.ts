/**
 * Utility type to make complex types more readable in IntelliSense
 */
type Prettify<T> = {
  [K in keyof T]: Prettify<T[K]>;
} & {};

/**
 * Main interface for Live Activity plugin functionality
 */
export interface LiveActivitiesPlugin {
  /**
   * Start a new Live Activity
   * @param options Configuration options for the Live Activity
   * @returns Promise with the generated activity ID
   */
  startActivity(options: LiveActivitiesOptions): Promise<{ activityId: string }>;

  /**
   * Update an existing Live Activity
   * @param options Update options including activity ID and new data
   * @returns Promise that resolves when update is complete
   */
  updateActivity(options: UpdateActivityOptions): Promise<void>;

  /**
   * End a Live Activity
   * @param options Options including activity ID and final data
   * @returns Promise that resolves when activity is ended
   */
  endActivity(options: EndActivityOptions): Promise<void>;

  /**
   * Get all active Live Activities
   * @returns Promise with array of all active activities
   */
  getAllActivities(): Promise<{ activities: ActivityInfo[] }>;

  /**
   * Get debug information about Live Activities
   * @returns Promise with debug information and activity count
   */
  debugActivities(): Promise<DebugActivities>;

  /**
   * Save an image for use in Live Activities
   * @param options Image save options
   * @returns Promise with success status and image name
   */
  saveImage(options: {
    /** Base64 encoded image data */
    imageData: string;
    /** Name to save the image as */
    name: string;
    /** Compression quality (0-1), optional */
    compressionQuality?: number;
  }): Promise<{ success: boolean; imageName: string }>;

  /**
   * Remove a saved image
   * @param options Options with image name to remove
   * @returns Promise with success status
   */
  removeImage(options: { name: string }): Promise<{ success: boolean }>;

  /**
   * List all saved images
   * @returns Promise with array of image names
   */
  listImages(): Promise<{ images: string[] }>;

  /**
   * Clean up all saved images
   * @returns Promise that resolves when cleanup is complete
   */
  cleanupImages(): Promise<void>;
}

/**
 * Configuration options for starting a Live Activity
 */
export type LiveActivitiesOptions = {
  /** Layout configuration for the activity */
  layout: ActivityLayout;
  /** Dynamic Island layout configuration (optional) */
  dynamicIslandLayout?: DynamicIslandLayout;
  /** Dynamic data to be displayed in the activity */
  data: Record<string, any>;
  /** Date when the activity becomes stale (optional) */
  staleDate?: number;
  /** Relevance score for activity prioritization (optional) */
  relevanceScore?: number;
  /** Behavior configuration for the activity */
  behavior: LiveActivitiesBehavior;
};

/**
 * Behavior configuration for a Live Activity
 * @category Configuration Types
 * @description Defines how the Live Activity behaves, including whether it should be pinned to the lock screen.
 */
export type LiveActivitiesBehavior = {
  backgroundTint?: ColorString;
  systemActionForegroundColor: ColorString;
  widgetUrl: string;
  keyLineTint: ColorString;
};

/**
 * Layout configuration for an activity
 * @category Configuration Types
 * @description The root layout element that defines the structure and appearance of a Live Activity.
 */
export type ActivityLayout = LayoutElement;

/**
 * Options for updating an existing Live Activity
 * @category Configuration Types
 * @description Configuration for updating an active Live Activity with new data and optional alert notifications.
 * @example
 * ```typescript
 * const updateOptions: UpdateActivityOptions = {
 *   activityId: "activity-123",
 *   data: { progress: 0.75, status: "In Progress" },
 *   alertConfiguration: {
 *     title: "Progress Update",
 *     body: "Task is 75% complete",
 *     sound: "default"
 *   }
 * };
 * ```
 */
export interface UpdateActivityOptions {
  /** ID of the activity to update */
  activityId: string;
  /** New data for the activity */
  data: Record<string, any>;
  /** Alert configuration for the update (optional) */
  alertConfiguration?: {
    /** Alert title */
    title: string;
    /** Alert body text */
    body: string;
    /** Sound to play with alert (optional) */
    sound?: string;
  };
}

/**
 * Options for ending a Live Activity
 * @category Configuration Types
 * @description Configuration for ending an active Live Activity with final data.
 * @example
 * ```typescript
 * const endOptions: EndActivityOptions = {
 *   activityId: "activity-123",
 *   data: { status: "Completed", finalResult: "Success" }
 * };
 * ```
 */
export interface EndActivityOptions {
  /** ID of the activity to end */
  activityId: string;
  /** Final data for the activity */
  data: Record<string, any>;
}

/**
 * Information about an active Live Activity
 * @category Data Types
 * @description Complete information about an active Live Activity including its configuration and current state.
 */
export interface ActivityInfo {
  /** Unique identifier of the activity */
  id: string;
  /** Layout configuration of the activity */
  layout: ActivityLayout;
  /** Current data of the activity */
  data: Record<string, any>;
  /** Date when the activity becomes stale (optional) */
  staleDate?: number;
  /** Relevance score of the activity (optional) */
  relevanceScore?: number;
}

/**
 * Debug information about Live Activities
 * @category Data Types
 * @description Debugging information containing all active activities and their count.
 */
export interface DebugActivities {
  /** Array of all activities */
  activities: ActivityInfo[];
  /** Total count of activities */
  count: number;
}

type ColorString =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'red'
  | 'blue'
  | 'green'
  | 'yellow'
  | 'orange'
  | 'purple'
  | 'pink'
  | 'black'
  | 'white'
  | 'gray'
  | 'clear'
  | `#${string}`;

/**
 * Union type representing any layout element with a unique ID
 * @category Layout Elements
 * @description Base type for all layout elements. Every element must have a unique ID and can be one of the supported element types.
 * @example
 * ```typescript
 * const element: LayoutElement = {
 *   id: "unique-element-id",
 *   type: "text",
 *   properties: [
 *     { text: "Hello World" }
 *   ]
 * };
 * ```
 */
export type LayoutElement = Prettify<
  {
    /** Unique identifier for the element */
    id: string;
  } & (LayoutElementContainer | LayoutElementText | LayoutElementImage | LayoutElementProgress | LayoutElementTimer)
>;

/**
 * Base properties that all layout elements can have as individual objects
 * @category Property Objects
 * @description These properties are available for all layout element types and handle basic positioning, transformations, sizing, and visual effects.
 */
type BasePropertyObject =
  // Positioning
  /** @property offset - Position offset as coordinates or template string @example { offset: { x: 10, y: 20 } } */
  | { offset: { x?: number; y?: number } }
  /** @property zIndex - Z-index for layering @example { zIndex: 1 } */
  | { zIndex: number }

  // Transformations
  /** @property opacity - Opacity value (0-1) @example { opacity: 0.8 } */
  | { opacity: number }
  /** @property rotation - Rotation in degrees @example { rotation: 45 } */
  | { rotation: number }
  /** @property scale - Scale factor (1 = normal size) @example { scale: 1.2 } */
  | { scale: number }

  // Frame
  /** @property width - Element width @example { width: 100 } */
  | { width: number }
  /** @property height - Element height (-1 means Full) @example { height: 50 } */
  | { height: number }
  /** @property maxWidth - Maximum width constraint (-1 means Full) @example { maxWidth: 200 } */
  | { maxWidth: number }
  /** @property maxHeight - Maximum height constraint (-1 means Full) @example { maxHeight: 100 } */
  | { maxHeight: number }
  /** @property minWidth - Minimum width constraint (-1 means Full) @example { minWidth: 50 } */
  | { minWidth: number }
  /** @property minHeight - Minimum height constraint (-1 means Full) @example { minHeight: 25 } */
  | { minHeight: number }
  /** @property backgroundGradient - Gradient background configuration @example { backgroundGradient: { colors: ["#ff0000", "#0000ff"], startPoint: "top", endPoint: "bottom" } } */
  | { backgroundGradient: { colors: ColorString[]; startPoint: GradientPoint; endPoint: GradientPoint } }
  /** @property backgroundCapsule - Background capsule style @example { backgroundCapsule: { foregroundColor: "#ffffff" } } */
  | { backgroundCapsule: { foregroundColor: ColorString } }
  /** @property paddingVertical - Vertical padding @example { paddingVertical: 12 } */
  | { paddingVertical: number }
  /** @property paddingHorizontal - Horizontal padding @example { paddingHorizontal: 16 } */
  | { paddingHorizontal: number }
  /** @property multilineTextAlignment - Text alignment for multiline text @example { multilineTextAlignment: "center" } */
  | { multilineTextAlignment: 'leading' | 'center' | 'trailing' | 'left' | 'right' }

  // Effects
  /** @property shadow - Shadow configuration @example { shadow: { color: "#000000", radius: 5, x: 2, y: 2 } } */
  | { shadow: { color?: ColorString; radius?: number; x?: number; y?: number } };

/**
 * Container-specific property objects
 * @category Property Objects
 * @description Properties specific to container elements, including layout direction, spacing, styling, and background effects.
 * @extends xxx
 */
type ContainerPropertyObject =
  | (BasePropertyObject | ContainerPropertyObjectBase | ContainerPropertyObjectVertical)[]
  | (BasePropertyObject | ContainerPropertyObjectBase | ContainerPropertyObjectHorizontal)[]
  | (BasePropertyObject | ContainerPropertyObjectBase | ContainerPropertyObjectStack)[];

type ContainerPropertyObjectBase =
  /** @property spacing - Spacing between child elements @example { spacing: 12 } */
  | { spacing: number }
  /** @property padding - Padding inside the container @example { padding: 16 } */
  | { padding: number | boolean }
  /** @property foregroundColor - Foreground color style of container @example { foregroundColor: "#ffffff" } */
  | { foregroundColor: ColorString }
  /** @property backgroundColor - Background color of the container @example { backgroundColor: "#000000" } */
  | { backgroundColor: ColorString }
  /** @property cornerRadius - Corner radius for rounded corners @example { cornerRadius: 8 } */
  | { cornerRadius: number }
  /** @property borderWidth - Border width @example { borderWidth: 2 } */
  | { borderWidth: number }
  /** @property borderColor - Border color @example { borderColor: "#cccccc" } */
  | { borderColor: ColorString }
  /** @property insideAlignment - Frame alignment within the container @example { insideAlignment: "center" } */
  | { alignment: ContainerPropertyObjectStackAlignment };

type ContainerPropertyObjectHorizontal =
  /** @property direction - Container layout direction @example { direction: "horizontal" / HStack } */
  | { direction: 'horizontal' }
  /** @property alignment - Vertical alignment within container @example { alignment: "center" } */
  | { insideAlignment: 'bottom' | 'center' | 'first-text-baseline' | 'last-text-baseline' | 'top' };

type ContainerPropertyObjectVertical =
  /** @property direction - Container layout direction @example { direction: "vertical" / VStack } */
  | { direction: 'vertical' }
  /** @property alignment - Horizontal alignment within container @example { alignment: "center" } */
  | {
      insideAlignment:
        | 'center'
        | 'leading'
        | 'left'
        | 'list-row-separator-leading'
        | 'list-row-separator-trailing'
        | 'list-row-separator-left'
        | 'list-row-separator-right'
        | 'trailing'
        | 'right';
    };

type ContainerPropertyObjectStackAlignment =
  | 'top'
  | 'top-leading'
  | 'top-trailing'
  | 'top-left'
  | 'top-right'
  | 'bottom'
  | 'bottom-left'
  | 'bottom-right'
  | 'center'
  | 'center-first-text-baseline'
  | 'center-last-text-baseline'
  | 'leading'
  | 'leading-first-text-baseline'
  | 'leading-last-text-baseline'
  | 'left'
  | 'left-first-text-baseline'
  | 'left-last-text-baseline'
  | 'trailing'
  | 'trailing-first-text-baseline'
  | 'trailing-last-text-baseline'
  | 'right'
  | 'right-first-text-baseline'
  | 'right-last-text-baseline';

type ContainerPropertyObjectStack =
  /** @property direction - Container layout direction @example { direction: "stack" / ZStack } */
  | { direction: 'stack' }
  /** @property alignment - Alignment within container @example { alignment: "center" } */
  | {
      insideAlignment: ContainerPropertyObjectStackAlignment;
    };
/**
 * Text-specific property objects
 * @category Property Objects
 * @description Properties specific to text elements, including content, typography, styling, and text formatting options.
 * @extends BasePropertyObject
 */
type TextPropertyObject =
  | BasePropertyObject
  /** @property text - Text content to display @example { text: "Hello World" } */
  | { text: string }
  /** @property fontSize - Font size @example { fontSize: 16 } */
  | { fontSize: number }
  /** @property fontWeight - Font weight @example { fontWeight: "bold" } */
  | { fontWeight: 'regular' | 'medium' | 'semibold' | 'bold' | 'heavy' | 'light' | 'thin' | 'black' }
  /** @property fontFamily - Font family name @example { fontFamily: "Helvetica" } */
  | { fontFamily: string }
  /** @property color - Text color @example { color: "#333333" } */
  | { color: ColorString }
  /** @property alignment - Text alignment @example { alignment: "center" } */
  | { alignment: 'leading' | 'center' | 'trailing' | 'left' | 'right' }
  /** @property lineLimit - Maximum number of lines @example { lineLimit: 2 } */
  | { lineLimit: number }
  /** @property italic - Whether text is italic @example { italic: true } */
  | { italic: boolean }
  /** @property underline - Whether text is underlined @example { underline: true } */
  | { underline: boolean }
  /** @property strikethrough - Whether text has strikethrough @example { strikethrough: false } */
  | { strikethrough: boolean }
  /** @property monospacedDigit - Whether to use monospaced digits @example { monospacedDigit: true } */
  | { monospacedDigit: boolean };

/**
 * Image-specific property objects
 * @category Property Objects
 * @description Properties specific to image elements, including display options, source configuration, and image styling.
 * @extends BasePropertyObject
 */
type ImagePropertyObject =
  | BasePropertyObject
  /** @property contentMode - How the image should fit within its bounds @example { contentMode: "fit" } */
  | { contentMode: 'fit' | 'fill' }
  /** @property cornerRadius - Corner radius for rounded image corners @example { cornerRadius: 12 } */
  | { cornerRadius: number }
  /** @property systeName - SF Symbols system name @example { systeName: "heart.fill" } */
  | { systeName: string }
  /** @property color - Color tint for SF Symbols @example { color: "#ff0000" } */
  | { color: ColorString }
  /** @property url - Remote image URL @example { url: "https://example.com/image.jpg" } */
  | { url: string }
  /** @property appGroup - App Group container identifier for saved images @example { appGroup: "group.com.example.app" } */
  | { appGroup: string }
  /** @property asset - Asset name from app bundle @example { asset: "logo" } */
  | { asset: string }
  /** @property base64 - Base64 encoded image data @example { base64: "iVBORw0KGgoAAAANSUhEUgAA..." } */
  | { base64: string }
  /** @property resizable - Whether the image is resizable @example { resizable: true } */
  | { resizable: boolean };

/**
 * Progress-specific property objects
 * @category Property Objects
 * @description Properties specific to progress bar elements, including value configuration, styling, and appearance options.
 * @extends BasePropertyObject
 */
type ProgressPropertyObject =
  | BasePropertyObject
  /** @property value - Current progress value @example { value: 0.7 } */
  | { value: number }
  /** @property total - Total/maximum value for progress calculation @example { total: 100 } */
  | { total: number }
  /** @property color - Progress bar fill color @example { color: "#00ff00" } */
  | { color: ColorString }
  /** @property backgroundColor - Progress bar background color @example { backgroundColor: "#f0f0f0" } */
  | { backgroundColor: ColorString }
  /** @property height - Height of the progress bar @example { height: 8 } */
  | { height: number };

/**
 * Timer-specific property objects
 * @category Property Objects
 * @description Properties specific to timer elements, including time configuration, display style, and formatting options.
 * @extends BasePropertyObject
 */
type TimerPropertyObject =
  | TextPropertyObject
  /** @property endTime - End time as timestamp in milliseconds @example { endTime: 1749337396616 } */
  | { endTime: number }
  /** @property style - Timer display style @example { style: "timer" } */
  | { style: 'timer' | 'relative' | 'date' | 'time' | 'offset' | 'countdown' };

/**
 * Container element that can hold other layout elements
 * @category Layout Elements
 * @description A container element that organizes child elements in various layouts (vertical, horizontal, or stack).
 * Containers support spacing, padding, backgrounds, borders, and gradients.
 * @example
 * ```typescript
 * const container: LayoutElementContainer = {
 *   id: "main-container",
 *   type: "container",
 *   properties: [
 *     { direction: "vertical" },
 *     { spacing: 12 },
 *     { padding: 16 },
 *     { backgroundColor: "#f0f0f0" }
 *   ],
 *   children: [textElement, imageElement]
 * };
 * ```
 */
export type LayoutElementContainer = Prettify<{
  /** Element type identifier */
  type: 'container';
  /** Container properties as array of property objects */
  properties?: ContainerPropertyObject;
  /** Child elements contained within this container */
  children: LayoutElement[];
}>;

/**
 * Background Gradient point options for defining gradient direction
 * @category Enums
 * @description Predefined points for gradient start and end positions.
 * @example
 * ```typescript
 * const backgroundGradient = {
 *   colors: ["#ff0000", "#0000ff"],
 *   startPoint: "top" as GradientPoint,
 *   endPoint: "bottom" as GradientPoint
 * };
 * ```
 */
type GradientPoint =
  /** @option top - Top edge */
  | 'top'
  /** @option bottom - Bottom edge */
  | 'bottom'
  /** @option leading - Leading edge (left in LTR, right in RTL) */
  | 'leading'
  /** @option trailing - Trailing edge (right in LTR, left in RTL) */
  | 'trailing'
  /** @option topLeading - Top-left corner */
  | 'topLeading'
  /** @option topTrailing - Top-right corner */
  | 'topTrailing'
  /** @option bottomLeading - Bottom-left corner */
  | 'bottomLeading'
  /** @option bottomTrailing - Bottom-right corner */
  | 'bottomTrailing'
  /** @option center - Center point */
  | 'center';

/**
 * Text element for displaying text content
 * @category Layout Elements
 * @description A text element for displaying styled text with typography controls, alignment, and formatting options.
 * @example
 * ```typescript
 * const textElement: LayoutElementText = {
 *   id: "title-text",
 *   type: "text",
 *   properties: [
 *     { text: "Welcome to Live Activities" },
 *     { fontSize: 18 },
 *     { fontWeight: "bold" },
 *     { color: "#333333" },
 *     { alignment: "center" }
 *   ]
 * };
 * ```
 */
export type LayoutElementText = Prettify<{
  /** Element type identifier */
  type: 'text';
  /** Text properties as array of property objects */
  properties: TextPropertyObject[];
}>;

/**
 * Image element for displaying images from various sources
 * @category Layout Elements
 * @description An image element that can display images from URLs, SF Symbols, app assets, base64 data, or saved images.
 * @example
 * ```typescript
 * const imageElement: LayoutElementImage = {
 *   id: "profile-image",
 *   type: "image",
 *   properties: [
 *     { url: "https://example.com/avatar.jpg" },
 *     { contentMode: "fit" },
 *     { cornerRadius: 25 },
 *     { width: 50 },
 *     { height: 50 }
 *   ]
 * };
 * ```
 */
export type LayoutElementImage = Prettify<{
  /** Element type identifier */
  type: 'image';
  /** Image properties as array of property objects */
  properties: ImagePropertyObject[];
}>;

/**
 * Progress bar element for showing completion progress
 * @category Layout Elements
 * @description A progress bar element for visualizing completion status with customizable styling and values.
 * @example
 * ```typescript
 * const progressElement: LayoutElementProgress = {
 *   id: "download-progress",
 *   type: "progress",
 *   properties: [
 *     { value: 0.75 },
 *     { total: 1.0 },
 *     { color: "#00ff00" },
 *     { backgroundColor: "#cccccc" },
 *     { height: 8 }
 *   ]
 * };
 * ```
 */
export type LayoutElementProgress = Prettify<{
  /** Element type identifier */
  type: 'progress';
  /** Progress bar properties as array of property objects */
  properties: ProgressPropertyObject[];
}>;

/**
 * Timer element for displaying countdown or time information
 * @category Layout Elements
 * @description A timer element for showing countdown timers, relative time, or formatted dates with various display styles.
 * @example
 * ```typescript
 * const timerElement: LayoutElementTimer = {
 *   id: "countdown-timer",
 *   type: "timer",
 *   properties: [
 *     { endTime: Date.now() + 3600000 }, // 1 hour from now
 *     { style: "timer" },
 *     { fontSize: 16 },
 *     { color: "#ff0000" }
 *   ]
 * };
 * ```
 */
export type LayoutElementTimer = Prettify<{
  /** Element type identifier */
  type: 'timer';
  /** Timer properties as array of property objects */
  properties: TimerPropertyObject[];
}>;

/**
 * Dynamic Island layout configuration for different states
 */
export interface DynamicIslandLayout {
  /** Expanded state layout with multiple areas */
  expanded?: {
    /** Leading area element */
    leading?: LayoutElement;
    /** Trailing area element */
    trailing?: LayoutElement;
    /** Center area element */
    center?: LayoutElement;
    /** Bottom area element */
    bottom?: LayoutElement;
  };
  /** Compact leading state configuration */
  compactLeading?: {
    /** Element to display in compact leading state */
    element: LayoutElement;
  };
  /** Compact trailing state configuration */
  compactTrailing?: {
    /** Element to display in compact trailing state */
    element: LayoutElement;
  };
  /** Minimal state configuration */
  minimal?: {
    /** Element to display in minimal state */
    element: LayoutElement;
  };
}
