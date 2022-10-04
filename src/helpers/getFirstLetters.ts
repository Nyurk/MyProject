const getFirstLetters = (firstName: string, lastName: string): string => {
  return (firstName[0] + lastName[0]).toUpperCase();
};

export default getFirstLetters;
