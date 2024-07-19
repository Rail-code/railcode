export const SystemMobileOsEnum = {
	ios: "ios",
	android: "android",
} as const;

export type SystemMobileOsType = keyof typeof SystemMobileOsEnum;
