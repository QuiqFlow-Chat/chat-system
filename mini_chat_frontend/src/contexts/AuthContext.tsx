// import React, { createContext, useContext, useState, useEffect } from "react";

// interface AuthContextProps {
//   token: string | null;
//   login: (token: string) => void;
//   logout: () => void;
//   isAuthenticated: boolean;
// }

// // 1. إنشاء السياق
// const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// // 2. إنشاء المزود (Provider)
// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [token, setToken] = useState<string | null>(() =>
//     localStorage.getItem("token")
//   );

//   const login = (newToken: string) => {
//     setToken(newToken);
//     localStorage.setItem("token", newToken);
//     // ممكن تخزن وقت الانتهاء أيضًا لو الباك يرجعه
//     localStorage.setItem("expiry", (Date.now() + 3600 * 1000).toString()); // مثال: ساعة واحدة
//   };

//   const logout = () => {
//     setToken(null);
//     localStorage.removeItem("token");
//     localStorage.removeItem("expiry");
//   };

//   useEffect(() => {
//     const expiry = localStorage.getItem("expiry");
//     if (expiry && Date.now() > +expiry) {
//       logout(); // انتهاء الصلاحية
//     }
//   }, []);

//   return (
//     <AuthContext.Provider
//       value={{ token, login, logout, isAuthenticated: !!token }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // 3. Hook مخصص لاستخدام السياق بسهولة
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };
