import IMask, { Masked } from "imask";

// маски для инпута номера телефона

export const createMask = (pattern: Masked) => {
    const mask = IMask.createPipe(
        pattern,
        IMask.PIPE_TYPE.UNMASKED,
        IMask.PIPE_TYPE.MASKED
    );

    const unmask = IMask.createPipe(
        pattern,
        IMask.PIPE_TYPE.MASKED,
        IMask.PIPE_TYPE.UNMASKED
    );

    return { mask, unmask };
};

export type Mask = ReturnType<typeof createMask>;

export const numberMask = createMask(
    IMask.createMask({
        mask: "+7 (000) 000 00 00",
        autofix: true,
    })
);

export const lazyNumberMask = createMask(
    IMask.createMask({
        mask: "+7 (000) 000 00 00",
        lazy: false,
        autofix: true,
    })
);
