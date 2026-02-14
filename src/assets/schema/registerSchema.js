import * as zod from 'zod'

export const schema=zod.object({
  name:zod.string().nonempty('name is required').min(3,'name at least 3').max(20, 'name at the most 20'),
  email:zod.string().nonempty('email is required').regex( /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'invalid email' ),
  password:zod.string().nonempty('password is required').regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,'weak password'),
  rePassword:zod.string().nonempty('rePassword is required'),
  dateOfBirth:zod.coerce.date('date is required').refine((value)=>
  { const userAge= value.getFullYear();
    const now = new Date().getFullYear();
    const diff= now - userAge;
    return diff >= 18
  },'age less than 18'),

  gender:zod.string().nonempty('gender is required'),

}).refine((data) => data.password === data.rePassword,{path:['rePassword'], message:'password and rePassword must be the same'})
