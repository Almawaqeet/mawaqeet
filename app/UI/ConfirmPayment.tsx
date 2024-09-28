import React from 'react'
import Image from 'next/image'
import Paragraph from '../libs/utilities/Paragraph'
import { whiteSpaces } from '../libs/utilities/GlobalSpaces'

type ConfrmpaymentProps = {
    className: string,
    image: HTMLImageElement | string
    imageStyle?: string
}

const ConfirmPayment: React.FC<ConfrmpaymentProps> = ({ className = '', image, imageStyle = '' }) => {
    return (
        <section className='max-w-[2000px] m-auto'>
            <div className={`bg-white xmd:h-[345px] xmd:width-[324px] rounded-lg flex flex-col items-center justify-center absolute ${whiteSpaces.paddingX} ${className}`}>
                <div>
                    <Image
                        src={image}
                        height={50}
                        width={50}
                        alt='pay.png'
                        layout='responsive'
                        className={imageStyle}
                    />
                </div>

                <div>
                    <Paragraph type='global' classname='xmd:text-fz-xs md:text-fz-sm lg:text-fz-md text-center font-dejavu md:leading-[27.94px] tracking-tight text-inherit xmd:leading-6'>Please wait while we redirect you to the confirmation page</Paragraph>
                </div>

            </div>
        </section>
    )
}

export default ConfirmPayment