import React, { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "firebase/auth";

import { auth } from "./firebase";
import NovaHome from "./NovaHome";
import "./lifedock.css";

export default function App() {
  const [user, setUser] = useState(null);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmObj, setConfirmObj] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const googleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      alert(err.message);
    }
  };

  const setupRecaptcha = () => {
    window.recaptchaVerifier =
      new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
        }
      );
  };

  const sendOTP = async () => {
    try {
      setupRecaptcha();

      const confirmation =
        await signInWithPhoneNumber(
          auth,
          phone,
          window.recaptchaVerifier
        );

      setConfirmObj(confirmation);
      alert("OTP Sent");
    } catch (err) {
      alert(err.message);
    }
  };

  const verifyOTP = async () => {
    try {
      await confirmObj.confirm(otp);
    } catch (err) {
      alert("Invalid OTP");
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  if (loading)
    return <div className="center-screen">Loading...</div>;

  if (user) {
    return (
      <>
        <div className="top-bar">
          <span>
            {user.email || user.phoneNumber}
          </span>

          <button
            className="ghost-btn"
            onClick={logout}
          >
            Logout
          </button>
        </div>

        <NovaHome />
      </>
    );
  }

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <h1>Nova</h1>
        <p className="muted">
          Private productivity system
        </p>

        <button
          className="primary-btn"
          onClick={googleLogin}
        >
          Continue with Google
        </button>

        <div className="divider">
          or use phone
        </div>

        <input
          placeholder="+91XXXXXXXXXX"
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)
          }
        />

        {!confirmObj ? (
          <button
            className="primary-btn"
            onClick={sendOTP}
          >
            Send OTP
          </button>
        ) : (
          <>
            <input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value)
              }
            />

            <button
              className="primary-btn"
              onClick={verifyOTP}
            >
              Verify OTP
            </button>
          </>
        )}

        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
}