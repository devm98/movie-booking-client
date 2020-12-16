export function clearToken() {
  localStorage.removeItem("id_token");
}

export function getToken() {
  try {
    const idToken = localStorage.getItem("id_token");
    return idToken;
  } catch (err) {
    clearToken();
    return undefined;
  }
}

export function saveToken(idToken) {
  try {
    localStorage.setItem("id_token", idToken);
  } catch (err) {
    clearToken();
  }
}

export const loadState = (key) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch {
    // ignore write errors
  }
};
