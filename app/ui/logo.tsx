import Image from 'next/image';

export default function Logo() {
   return (
    <div className='md:w-50 p-5'>
      <Image src="/logo.png" width={300} height={20} alt='logo' priority={true}/>
    </div>
   );
}