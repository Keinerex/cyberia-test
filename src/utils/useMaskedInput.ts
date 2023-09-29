import { Mask } from "@/utils/masks";
import { ChangeEventHandler, FocusEventHandler, useCallback } from "react";


// функции используемые для масочного ввода обернул в хук

export const useMaskedInput = (
    mask: Mask,
    lazyMask: Mask = mask,
    minCaret: number = 0
) => {
    const changeHandler: ChangeEventHandler<HTMLInputElement> = e => {
        const unmasked = lazyMask.unmask(e.target.value);
        e.target.value = lazyMask.mask(unmasked); // добавляем маску на новое значение и устанавливаем значением
        const masked = mask.mask(unmasked);
        const carpet = Math.max(minCaret, masked.length);
        e.target.setSelectionRange(carpet, carpet);
    };

    const blurHandler: FocusEventHandler<HTMLInputElement> = e => {
        const unmasked = lazyMask.unmask(e.target.value);
        if (!unmasked) {
            e.target.value = "";
        }
    };

    const focusHandler: FocusEventHandler<HTMLInputElement> = e => {
        const unmasked = lazyMask.unmask(e.target.value);
        e.target.value = lazyMask.mask(unmasked);
        const masked = mask.mask(unmasked);
        const carpet = Math.max(minCaret, masked.length);
        setTimeout(() => e.target.setSelectionRange(carpet, carpet), 0);
    };

    const onChange = useCallback(changeHandler, [lazyMask, mask, minCaret]);
    const onBlur = useCallback(blurHandler, [lazyMask]);
    const onFocus = useCallback(focusHandler, [lazyMask, mask, minCaret]);

    return {
        onChange,
        onFocus,
        onBlur,
    };
};
