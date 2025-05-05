export function catchAsync(){
    return function (_target:any , _propertyKey:string , descriptor:PropertyDescriptor){
        const originalMethod = descriptor.value;

        descriptor.value = async function (...args: any[]) {
            const next = args[2];
            try {
                return await originalMethod.apply(this, args);
            } catch (error) {
                next(error)
            };
        };
        return descriptor;
    };
}