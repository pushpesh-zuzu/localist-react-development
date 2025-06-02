import React, { useEffect, useState } from "react";
import styles from "./ViewProfile.module.css";
import { showToast } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { addSubmitReviewApi, getReviewListApi } from "../../store/MyProfile/myProfileSlice";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const SubmitReviewModal = ({ setOpen, closeModal, ProfileIDs }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);
    const dispatch = useDispatch();
    const { reviewLoader } = useSelector((state) => state.myProfile);
    const { userToken } = useSelector((state)=> state.auth)
       const { registerData } = useSelector(
          (state) => state.findJobs
        );
        const userId = userToken?.id  ? userToken?.id  : registerData?.id
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        review: ""
    });
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        review: "",
        rating: ""
    });
 useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        const { name, email, review } = formData;
        const newErrors = {
            name: !name.trim() ? "Name is required." : "",
            email: !email.trim() ? "Email is required." : "",
            review: !review.trim() ? "Review is required." : "",
            rating: !rating ? "Rating is required." : ""
        };

        setErrors(newErrors);
        const hasErrors = Object.values(newErrors).some((err) => err !== "");
        if (hasErrors) return;

        const data = { ...formData, ratings: rating, uuid: ProfileIDs };

        dispatch(addSubmitReviewApi(data)).then((result) => {
            if (result) {
                showToast("success", result?.message);
                closeModal();
                dispatch(getReviewListApi(userId))
            }
        });
    };
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
            <div className={styles.closeButton} onClick={closeModal}>
    X
  </div>
                <h2>Leave a review for Resolve Energy Ltd</h2>
                <div className={styles.ratingSection}>
                    <span>Click to rate :</span>
                    {[...Array(5)].map((_, index) => {
                        const currentRating = index + 1;
                        return (
                            <span
                                key={index}
                                className={`${styles.star} ${currentRating <= (hover ?? rating) ? styles.active : ""
                                    }`}
                                onClick={() => {
                                    setRating(currentRating);
                                    setErrors((prev) => ({ ...prev, rating: "" }));
                                }}
                                onMouseEnter={() => setHover(currentRating)}
                                onMouseLeave={() => setHover(null)}
                            >
                                ★
                            </span>
                        );
                    })}
                </div>
                {errors.rating && <p className={styles.error}>{errors.rating}</p>}

                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            className={styles.input}
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {errors.name && <p className={styles.error}>{errors.name}</p>}
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className={styles.input}
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p className={styles.error}>{errors.email}</p>}
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Review</label>
                        <textarea
                            name="review"
                            className={styles.textarea}
                            placeholder="Describe what it was like working with Resolve Energy Ltd and the reasoning behind your rating."
                            rows="5"
                            value={formData.review}
                            onChange={handleChange}
                        />
                        {errors.review && <p className={styles.error}>{errors.review}</p>}
                    </div>

                </div>
                <div className={styles.buttonRow}>
                    <button onClick={closeModal} className={styles.cancelBtn}>
                        Cancel
                    </button>
                    <button onClick={handleSubmit} className={styles.submitBtn}>
                        {reviewLoader ? <Spin
                            indicator={<LoadingOutlined spin style={{ color: "white" }} />}
                        /> : "Post Review"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SubmitReviewModal;
