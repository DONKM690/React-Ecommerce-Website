import {
    useState,
    useEffect,
    useContext
} from "react";

import "./Profile.css";

import { AuthContext } from "../context/AuthContext";

function Profile() {

    const { user } = useContext(AuthContext);

    const [profile, setProfile] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        gender: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
    });

    const [activeTab, setActiveTab] = useState("profile");
    const [isEditing, setIsEditing] = useState(false);

    // LOAD PROFILE
    useEffect(() => {

        try {

            if (user?.email) {

                const savedProfile = JSON.parse(
                    localStorage.getItem(
                        `profile_${user.email}`
                    )
                );

                if (savedProfile) {

                    setProfile(savedProfile);

                } else {

                    setIsEditing(true);
                }
            }

        } catch (err) {

            console.log(err);
            setIsEditing(true);

        }

    }, [user]);

    // HANDLE INPUT
    const handleChange = (e) => {

        setProfile({
            ...profile,
            [e.target.name]: e.target.value
        });

    };

    // SAVE PROFILE
    const handleSave = () => {

        // VALIDATION
        if (
            !profile.firstName ||
            !profile.email ||
            !profile.phone ||
            !profile.address
        ) {

            alert("Please fill all required fields ❌");
            return;
        }

        localStorage.setItem(
            `profile_${user.email}`,
            JSON.stringify(profile)
        );

        setIsEditing(false);
        setActiveTab("profile");

        alert("Profile saved ✅");
    };

    return (

        <div className="profile-wrapper">

            <div className="profile-box">

                {/* SIDEBAR */}
                <div className="profile-sidebar">

                    <div className="profile-menu">

                        <h4 className="profile-menu-title">
                            ⚙️ ACCOUNT SETTINGS
                        </h4>

                        <p
                            className={`profile-menu-item ${
                                activeTab === "profile"
                                    ? "active"
                                    : ""
                            }`}
                            onClick={() => {
                                setActiveTab("profile");
                                setIsEditing(false);
                            }}
                        >
                            👤 Profile Information
                        </p>

                        <p
                            className={`profile-menu-item ${
                                activeTab === "address"
                                    ? "active"
                                    : ""
                            }`}
                            onClick={() => {
                                setActiveTab("address");
                                setIsEditing(true);
                            }}
                        >
                            🏠 Manage Address
                        </p>

                    </div>

                </div>

                {/* MAIN */}
                <div className="profile-main">

                    {isEditing ? (

                        <>

                            <h2 className="profile-title">
                                ✏️ Edit Profile
                            </h2>

                            {/* NAME */}
                            <div className="profile-form-row">

                                <input
                                    className="profile-input"
                                    type="text"
                                    name="firstName"
                                    placeholder="👤 First Name"
                                    value={profile.firstName}
                                    onChange={handleChange}
                                />

                                <input
                                    className="profile-input"
                                    type="text"
                                    name="lastName"
                                    placeholder="👤 Last Name"
                                    value={profile.lastName}
                                    onChange={handleChange}
                                />

                            </div>

                            {/* EMAIL + PHONE */}
                            <div className="profile-form-row">

                                <input
                                    className="profile-input"
                                    type="email"
                                    name="email"
                                    placeholder="📧 Email Address"
                                    value={profile.email}
                                    onChange={handleChange}
                                />

                                <input
                                    className="profile-input"
                                    type="text"
                                    name="phone"
                                    placeholder="📞 Phone Number"
                                    value={profile.phone}
                                    onChange={handleChange}
                                />

                            </div>

                            {/* GENDER */}
                            <select
                                className="profile-select"
                                name="gender"
                                value={profile.gender}
                                onChange={handleChange}
                            >

                                <option value="">
                                    🚻 Select Gender
                                </option>

                                <option>
                                    👨 Male
                                </option>

                                <option>
                                    👩 Female
                                </option>

                                <option>
                                    ⚧ Other
                                </option>

                            </select>

                            {/* ADDRESS */}
                            <textarea
                                className="profile-textarea"
                                name="address"
                                placeholder="🏠 Full Address"
                                value={profile.address}
                                onChange={handleChange}
                            />

                            {/* CITY + STATE */}
                            <div className="profile-form-row">

                                <input
                                    className="profile-input"
                                    type="text"
                                    name="city"
                                    placeholder="🏙️ City"
                                    value={profile.city}
                                    onChange={handleChange}
                                />

                                <input
                                    className="profile-input"
                                    type="text"
                                    name="state"
                                    placeholder="🌍 State"
                                    value={profile.state}
                                    onChange={handleChange}
                                />

                            </div>

                            {/* PINCODE */}
                            <input
                                className="profile-input"
                                type="text"
                                name="pincode"
                                placeholder="📮 Pincode"
                                value={profile.pincode}
                                onChange={handleChange}
                            />

                            {/* SAVE BUTTON */}
                            <button
                                className="profile-save-btn"
                                onClick={handleSave}
                            >
                                💾 Save Profile
                            </button>

                        </>

                    ) : (

                        <>

                            <h2 className="profile-title">
                                👤 Personal Information
                            </h2>

                            <div className="profile-info-card">
                                <span>👤 Name</span>

                                <span>
                                    {profile.firstName} {profile.lastName}
                                </span>
                            </div>

                            <div className="profile-info-card">
                                <span>📧 Email</span>

                                <span>
                                    {profile.email}
                                </span>
                            </div>

                            <div className="profile-info-card">
                                <span>📞 Phone</span>

                                <span>
                                    {profile.phone}
                                </span>
                            </div>

                            <div className="profile-info-card">
                                <span>🚻 Gender</span>

                                <span>
                                    {profile.gender}
                                </span>
                            </div>

                            <div className="profile-info-card">
                                <span>🏠 Address</span>

                                <span>
                                    {profile.address}
                                </span>
                            </div>

                            <div className="profile-info-card">
                                <span>🏙️ City</span>

                                <span>
                                    {profile.city}
                                </span>
                            </div>

                            <div className="profile-info-card">
                                <span>🌍 State</span>

                                <span>
                                    {profile.state}
                                </span>
                            </div>

                            <div className="profile-info-card">
                                <span>📮 Pincode</span>

                                <span>
                                    {profile.pincode}
                                </span>
                            </div>

                            {/* EDIT BUTTON */}
                            <button
                                className="profile-save-btn"
                                onClick={() => setIsEditing(true)}
                            >
                                ✏️ Edit Profile
                            </button>

                        </>

                    )}

                </div>

            </div>

        </div>
    );
}

export default Profile;