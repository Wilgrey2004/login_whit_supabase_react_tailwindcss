import { createContext, useEffect, useState, useContext } from "react";
import { supabase } from "../supabaseClient";
import { data } from "react-router-dom";
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState(undefined);

  //sign up
  const signUpNewUser = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      console.error("there was s problem from signing up error: ", error);
      return {
        success: false,
        error,
      };
    }

    return {
      success: true,
      data,
    };
  };

  //sign in

  const SignInUser = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        console.error(error);
        return { success: false, error: error.message };
      }

      console.log("sig in success: ", data);
      return { success: true, data };
    } catch (error) {
      console.error(error);
    }
  };

  // sign out
  const SignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  return (
    <AuthContext value={{ session, signUpNewUser, SignOut, SignInUser }}>
      {children}
    </AuthContext>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};

//32jA323364@1
