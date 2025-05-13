import { NextFunction } from "express";

export function catchAsync() {
  return function (_target: unknown, _propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: unknown[]) {
      const next : NextFunction = args[2] as NextFunction;
      try {
        return await originalMethod.apply(this, args);
      } catch (error) {
        next(error);
      }
    };
    return descriptor;
  };
}
