"use client"

import { ShoppingCart, User, Search } from 'lucide-react'
import Link from 'next/link'
import { useCart } from '@/hooks/useCart';

export default function Header(){
    const { getTotalQuantity } = useCart(); 
    const totalItems = getTotalQuantity();
    
    return (
        <header className="border-b border-gray-200">
            <div className="max-w-7x1 mx-auto px-4 py-3 flex justify-between items-center">
                <Link href="/" className='text-2x1 pl-12 font-bold tracking-wide  '>Julie</Link>
                <nav className='hidden md:flex gap-6 text-sm font-medium text-gray-700'>
                    <Link href="/"> Home</Link> 
                    <Link href="/shop"> Shop</Link> 
                    <Link href="/products"> Product</Link> 
                    <Link href="/blog"> Blog</Link> 
                    <Link href="/contact"> Contact</Link> 
                    <Link href="/about"> About</Link> 
                </nav>
           
                <div className='flex gap-4 items-center'>
                    <button className='p-2 text-gray-500 hover:text-black'>
                        <Search size={20} />
                    </button>
                    <button className='p-2 text-gray-500 hover:text-black'>
                        <User size={20} />
                    </button>
                    <Link href="/cart" className="relative p-2 text-gray-500 hover:text-black">                    
                        <ShoppingCart size={20} />
                        {totalItems > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                            {totalItems}
                            </span>
                        )}
                    </Link>

                </div>
            </div> 
            
        </header> 
    )
}