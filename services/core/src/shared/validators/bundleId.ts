import {
	registerDecorator,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface,
	ValidationArguments,
} from "class-validator";

@ValidatorConstraint({ async: false })
export class IsBundleIdConstraint implements ValidatorConstraintInterface {
	validate(bundleId: string, args: ValidationArguments) {
		// Regex to validate iOS and Android bundle IDs
		const bundleIdRegex = /^[a-zA-Z]{1}[a-zA-Z0-9\-\_]*(\.[a-zA-Z0-9\-\_]+)+$/;

		return typeof bundleId === "string" && bundleIdRegex.test(bundleId);
	}

	defaultMessage(args: ValidationArguments) {
		return "Invalid app identifier";
	}
}

export function IsAppBundleId(validationOptions?: ValidationOptions) {
	// biome-ignore lint/complexity/noBannedTypes: <Object is required>
	return (object: Object, propertyName: string) => {
		registerDecorator({
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			constraints: [],
			validator: IsBundleIdConstraint,
		});
	};
}
