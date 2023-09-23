const translatePriority = (priority: string): string => {
  switch (priority) {
    case 'high':
      return 'élevée';
    case 'medium':
      return 'moyenne';
    case 'low':
      return 'basse';
    default:
      return 'Non définie';
  }
};

export { translatePriority };
