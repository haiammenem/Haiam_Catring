import { useEffect, useState, useCallback } from "react";

export default function useTheme() {
  const [dark, setDark] = useState(() => {
    // اقرأ القيمة من localStorage أول ما الهوك يشتغل
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true; // default dark
  });

  // حفظ الثيم في localStorage
  useEffect(() => {
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  // دالة جاهزة للتبديل (أحسن من كتابة !dark كل مرة)
  const toggleTheme = useCallback(() => {
    setDark((prev) => !prev);
  }, []);

  return {
    dark,
    setDark,
    toggleTheme,
  };
}