import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEdit } from 'react-icons/fa'; // Import an edit icon

function MyProfile() {
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const delay = (d) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, d * 1000);
    });
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let formData = new FormData();
      Object.keys(data).forEach(key => formData.append(key, data[key]));
      if (imageFile) {
        formData.append('profile_image', imageFile);
      }

      let response = await fetch("http://localhost:3000/editprofilestudent", {
        method: "POST",
        body: formData,
      });
      let res = await response.text();
      console.log(data, res);
      // Show success toast
      await delay(2); // wait for 2 seconds
      toast.success('Profile updated successfully!');
      navigate('/studentlogin');
    } catch (error) {
      console.error("Error:", error);
      // Show error toast
      toast.error('Error updating profile.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      setImageUrl(URL.createObjectURL(file)); // Show selected image
    }
  };

  useEffect(() => {
    fetch('student.json')
      .then(response => response.json())
      .then(data => {
        setUserInfo(data[0]);
        setValue('t1', data[0].Student_Name);
        setValue('t2', data[0].Last_Name);
        setValue('t3', data[0].Address);
        setValue('t4', data[0].Phone_Number);
        setValue('t5', data[0].Father_Name);
        setValue('t6', data[0].Student_Id);
        setValue('t7', data[0].Email_Id);
        setValue('t8', data[0].Password);
        setValue('t11', data[0].file_path);
        setImageUrl(data[0].file_path);
      })
      .catch(error => console.error('Error fetching user info:', error));
  }, [setValue]);

  return (
    <div>
      <ToastContainer />

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ maxWidth: '600px' }}>
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <div style={{ padding: '1.5rem' }}>
              <h2 style={{ marginBottom: '1rem', fontSize: '1.5rem', fontWeight: '600' }}>Edit Profile</h2>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <img src={imageUrl} alt="User Avatar" style={{width: '80px',height: '80px',borderRadius: '50%',marginRight: '1rem',border: '2px solid #ddd',boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}/>
                <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} id="imageUpload"/>
                <label htmlFor="imageUpload" style={{position: 'absolute',bottom: '0',right: '0',backgroundColor: '#ffffff',borderRadius: '50%',padding: '0.5rem',boxShadow: '0 4px 8px rgba(0,0,0,0.2)',cursor: 'pointer'}}>
                  <FaEdit size={20} color="#3182ce" />
                </label>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row' }}>
                  <div style={{ marginRight: '1rem', flex: '1' }}>
                    <label>Student Name</label>
                    <input
                      type="text"
                      style={{ width: '100%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #ccc' }}
                      defaultValue={userInfo.Student_Name}
                      {...register('t1')}
                    />
                  </div>
                  <div style={{ flex: '1' }}>
                    <label>Last Name</label>
                    <input
                      type="text"
                      style={{ width: '100%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #ccc' }}
                      defaultValue={userInfo.Last_Name}
                      {...register('t2')}
                    />
                  </div>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label>Address</label>
                  <input
                    type="text"
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #ccc' }}
                    defaultValue={userInfo.Address}
                    {...register('t3')}
                    
                  />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label>Phone Number</label>
                  <input
                    type="text"
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #ccc' }}
                    defaultValue={userInfo.Phone_Number}
                    {...register('t4')}
                  />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label>Father Name</label>
                  <input
                    type="text"
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #ccc' }}
                    defaultValue={userInfo.Father_Name}
                    {...register('t5')}
                  />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label>Student ID</label>
                  <input
                    type="text"
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #ccc' }}
                    defaultValue={userInfo.Student_Id}
                    {...register('t6')}
                  />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label>Email</label>
                  <input
                    type="text"
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #ccc' }}
                    defaultValue={userInfo.Email_Id}
                    {...register('t7')}
                    
                  />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <input
                    type="text"
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #ccc' }}
                    defaultValue={userInfo.Email_Id}
                    {...register('t8')}
                    
                    hidden
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <button
                    type="submit"
                    className="btn-primary"
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '0.25rem',
                      backgroundColor: '#3182ce',
                      color: '#ffffff',
                      cursor: 'pointer',
                      opacity: isSubmitting ? 0.6 : 1
                    }}
                    disabled={isSubmitting || loading}
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
