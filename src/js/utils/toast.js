const DEFAULT_ERROR_MESSAGE = 'Something went wrong, please try again.';

export const successToast = (message) =>
  iziToast.success({
    position: 'bottomCenter',
    message,
  });

  export const warningToast = (message) =>
  iziToast.warning({
    position: 'bottomCenter',
    message,
  });

export const errorToast = (message = DEFAULT_ERROR_MESSAGE) =>
  iziToast.error({
    title: 'Error',
    position: 'bottomCenter',
    message,
  });
