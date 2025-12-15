export const formatUKPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return phoneNumber;

  if (phoneNumber.startsWith("+44")) {
    return "0" + phoneNumber.slice(3);
  }

  if (phoneNumber.startsWith("44")) {
    return "0" + phoneNumber.slice(2);
  }

  if (phoneNumber.startsWith("0")) {
    return phoneNumber;
  }

  return "0" + phoneNumber;
};