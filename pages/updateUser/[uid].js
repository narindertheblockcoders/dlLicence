import UpdateUser from '@/Components/UpdateUser'
import React from 'react'

const updateUser = (itemData) => {
  return (
    <div>
        <UpdateUser itemData={itemData}/>
    </div>
  )
}

export default updateUser;

export async function getServerSideProps(context) {
    const { params } = await context;

    console.log(params,"param here");
  
    const {uid}= await params;
    console.log(uid,"id here");
  
      return {
        props: {
          id:uid,
        },
      };
  
  }