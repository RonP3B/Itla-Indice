export let warningInfo;

export const getWarningDistance = (ref) => {
  const height = ref.current.offsetHeight;
  const scroll = window.scrollY;
  const absolutePointer = 8;

  return scroll + height + absolutePointer;
};

export const getWarningInfo = (ref, message) => {
  const { top, left } = ref.current.getBoundingClientRect();

  return {
    top: top + getWarningDistance(ref),
    left,
    message,
  };
};

export const setType = (type, ref) => {
  switch (type) {
    case "NAME":
      warningInfo = getWarningInfo(ref, "ingrese su nombre");
      break;
    case "NAME_LENGTH":
      warningInfo = getWarningInfo(
        ref,
        "el nombre debe tener más de 2 caracteres"
      );
      break;
    case "EMAIL":
      warningInfo = getWarningInfo(ref, "ingrese su correo electrónico");
      break;
    case "INVALID_EMAIL":
      warningInfo = getWarningInfo(ref, "correo electrónico inválido");
      break;
    case "SUBJECT":
      warningInfo = getWarningInfo(ref, "ingrese el asunto");
      break;
    case "MESSAGE":
      warningInfo = getWarningInfo(ref, "ingrese el mensaje");
      break;
    default:
      console.log("No type match found");
  }
};

export const validateEmail = (email) => {
  const emailRegex =
    /^(([^<>()[\]\\.,:\s@"]+(\.[^<>()[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (emailRegex.test(email)) return true;

  return false;
};
