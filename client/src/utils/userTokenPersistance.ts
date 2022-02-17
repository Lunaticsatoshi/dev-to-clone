const get = () => localStorage.getItem("authTokens");
const set = (value: string) => localStorage.setItem("authTokens", value);
const clear = () => localStorage.removeItem("authTokens");

export { get, set, clear };
