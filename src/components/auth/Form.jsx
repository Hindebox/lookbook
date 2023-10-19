export default function Form({
  formTitle,
  formData,
  setFormData,
  onSubmit,
  isRegisterForm,
}) {
  const handleInputChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <form onSubmit={onSubmit}>
      <h2>{formTitle}</h2>
      {isRegisterForm && (
        <>
          <div className="form-field">
            <input
              type="text"
              placeholder="Firstname"
              name="firstname"
              value={formData.firstname}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-field">
            <input
              type="text"
              placeholder="Lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
            />
          </div>
        </>
      )}
      <div className="form-field">
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-field">
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">{formTitle}</button>
    </form>
  );
}
