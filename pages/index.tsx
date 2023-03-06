import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import { AuthContext } from "@/context/auth/AuthProvider";
import { get, limitToLast, orderByChild, query, ref } from "firebase/database";
import { db } from "@/firebase-config";

export default function Home() {
  const [bookId, setBookId] = useState<string>("");
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (!currentUser) return;

    const path = `users/${currentUser.uid}`;
    const booksRef = ref(db, path);

    const fetchFavoriteBook = async () => {
      await get(query(booksRef, orderByChild("isFavorite"), limitToLast(1)))
        .then((response) => {
          return response.val();
        })
        .then((value) => {
          const key: string = Object.keys(value)[0];
          setBookId(key);
        });
    };

    fetchFavoriteBook();
  }, [currentUser]);

  return (
    <MainLayout>
      <Link href="/vocabulary/list?page=1">Start!</Link>
    </MainLayout>
  );
}
