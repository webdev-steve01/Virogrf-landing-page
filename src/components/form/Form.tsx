"use client";
import React, { useState } from "react";
import { Formik, Form as FormikForm, Field } from "formik";
import * as Yup from "yup";
import { addUser } from "@/lib/auth";
import toast from "react-hot-toast";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import cancel from "../../../public/svgs/cancel-circle-svgrepo-com.svg";
import Link from "next/link";

const UserSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Phone must contain only digits")
    .min(10, "Phone must be at least 10 digits")
    .max(15, "Phone must not exceed 15 digits")
    .required("Phone number is required"),
});

function Form() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: false });
  const [successModal, setSuccessModal] = useState(false);

  return (
    <>
      <Formik
        initialValues={{ name: "", email: "", phone: "" }}
        validationSchema={UserSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          const result = await addUser(values);
          if (result.success) {
            toast.success("User added successfully!");
            setSuccessModal(true);
            resetForm();
          } else {
            toast.error(`⚠️ ${result.message}`);
          }
          setSubmitting(false);
        }}
        validate={(values) => {
          try {
            UserSchema.validateSync(values, { abortEarly: false });
          } catch (err) {
            if (err instanceof Yup.ValidationError) {
              const messages = err.errors.join("\n");
              toast.error(`${messages}`);
            }
          }
          return {}; // must return an object
        }}
      >
        {({ isSubmitting }) => (
          <FormikForm ref={ref} className="waitlist-form" id="waitlist">
            <div>
              <label htmlFor="name">
                <p className="label">Name</p>
              </label>
              <Field
                type="text"
                name="name"
                id="name"
                placeholder="Enter your name"
                className="waitlist-input"
              />
            </div>

            <div>
              <label htmlFor="email">
                <p className="label">Email</p>
              </label>
              <Field
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                className="waitlist-input"
              />
            </div>

            <div>
              <label htmlFor="phone">
                <p className="label">Phone Number</p>
              </label>
              <Field
                type="tel"
                name="phone"
                id="phone"
                placeholder="Enter your phone number"
                className="waitlist-input"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="waitlist-btn"
            >
              {isSubmitting
                ? "Saving..."
                : "Join the waitlist - few spots left"}
            </button>

            <p className="privacy-note">
              We respect your privacy, unsubscribe anytime
            </p>
          </FormikForm>
        )}
      </Formik>
      {successModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>🎉 You&lsquo;re on the waitlist! </h2>
            <p>
              You&lsquo;re in early — don&lsquo;t miss out. Our WhatsApp
              community is where
              <strong>
                {" "}
                exclusive announcements, beta invites, and founder insights{" "}
              </strong>
              drop first. Join now before everyone else gets in ⏳ .
            </p>
            <Link
              href="https://chat.whatsapp.com/CwtBxsR7utF5t9VAnjE6dC?mode=ac_t"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="waitlist-btn">Join WhatsApp Community</button>
            </Link>
            <Image
              src={cancel}
              alt="cancel"
              onClick={() => setSuccessModal(false)}
              className="cancel-modal"
              width={20}
              height={20}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Form;
