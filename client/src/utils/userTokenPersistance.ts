const get = () => localStorage.getItem("authTokens");
const set = (value: string) => localStorage.setItem("authTokens", value);
const clear = () => localStorage.removeItem("authTokens");

const userTokenPersistance = { get, set, clear };

export default userTokenPersistance;
