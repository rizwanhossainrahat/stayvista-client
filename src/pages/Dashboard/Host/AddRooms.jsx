
import { useState } from 'react';
import AddRoomForm from '../../../components/Form/AddRoomForm';
import { imageUpload } from '../../../api/utils';
import useAuth from '../../../hooks/useAuth';
import { Helmet } from 'react-helmet-async';
import { useMutation } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddRooms = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const axiosSecure=useAxiosSecure()
    const {user} = useAuth()
    const [imagePreview,setImagePreview]=useState()
    const [imageText,setImageText]=useState('Upload Image')
    const [dates, setDates] = useState(
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
      );

      //date range
      const handleDates=item=>{
        console.log(item);
        setDates(item.selection);
      }


      // show image in the UI
      const handleImageUpload=image =>{
        setImagePreview(URL.createObjectURL(image))
        setImageText(image.name)
      }


      const {mutateAsync}=useMutation({
        mutationFn: async roomData => {
          const { data } = await axiosSecure.post(`/room`, roomData)
          return data
        },
        onSuccess: () => {
          console.log('Data Saved Successfully')
          toast.success('Room Added Successfully!')
          navigate('/dashboard/my-listings')
          setLoading(false)
        },
      })

        //   Form handler
  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    const form = e.target
    const location = form.location.value
    const category = form.category.value
    const title = form.title.value
    const to = dates.endDate
    const from = dates.startDate
    const price = form.price.value
    const guests = form.total_guest.value
    const bathrooms = form.bathrooms.value
    const description = form.description.value
    const bedrooms = form.bedrooms.value
    const image = form.image.files[0]

    const host = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
    }
    console.log(user);
    
    try{
        const image_url=await imageUpload(image)
        const roomData = {
            location,
            category,
            title,
            to,
            from,
            price,
            guests,
            bathrooms,
            bedrooms,
            host,
            description,
            image: image_url,
          }
          // send roomdata data to server
          await mutateAsync(roomData)
    }
    catch(error){
      toast.error(error.message)
      setLoading(false)
    } 
  }

    return (
        <>
            <Helmet>
              <title>Add Room | StayVista</title>
              
            </Helmet>

            {/* Form */}
            <AddRoomForm
             dates={dates}
              handleDates={handleDates}
               handleSubmit={handleSubmit} 
               handleImageUpload={handleImageUpload}
               imageText={imageText}
               imagePreview={imagePreview}
               loading={loading}
            ></AddRoomForm>
        </>
    );
};

export default AddRooms;<h1>add rooms</h1>