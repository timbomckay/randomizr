const StorageName = "randomizr";

export function getStorage(): { name: string; uid: string; count: string }[] {
  const item = localStorage.getItem(StorageName);

  if (item != null) {
    return JSON.parse(item);
  }

  return [];
}

export function updateStorage(data: [] | {}) {
  localStorage.setItem(StorageName, JSON.stringify(data));
}
