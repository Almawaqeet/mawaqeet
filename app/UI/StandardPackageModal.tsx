'use client';
import * as React from 'react';
import { LiaTimesSolid } from 'react-icons/lia';
import Box from '@mui/material/Box';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useMbisContext } from '../libs/hooks/useContextProvider';
import SlantDiv from './SlantDiv';
import Headings from '../libs/utilities/Headings';
import Paragraph from '../libs/utilities/Paragraph';
import Link from 'next/link';
import BtnGlobal from './BtnGlobal';
import { packages } from '../contents/services';

const style = {
  position: 'absolute' as 'absolute',
  top: '35%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  maxWidth: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  '@media (min-width: 175px)': {
    top: '40%',
    maxWidth: 300,
    borderRadius: '8px',
  },

  '@media (min-width: 600px)': {
    maxWidth: 400,
    borderRadius: '8px',
  },
  '@media (min-width: 640px)': {
    maxWidth: 600,
    borderRadius: '12px',
  },
  '@media (min-width: 900px)': {
    maxWidth: 800,
    borderRadius: '20px',
  },
};

export default function StandardPackageModal() {
  const {
    state: { openStandardPackage },
    dispatch,
  } = useMbisContext();

  const handleClose = () => {
    dispatch({ type: 'openStandardPackage', payload: false });
  };

  const standard_package = packages.find((itm) => itm.id === 'standard package')
  return (
    <div>
      <Modal
        open={openStandardPackage as boolean}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex justify-end">
            {' '}
            <LiaTimesSolid
              onClick={handleClose}
              className="xmd:w-6 xmd:h-6 md:w-8 md:h-8"
            />
          </div>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="xmd:pb-8"
          >
            <SlantDiv className={'xmd:before:w-[60px] '}>
              <Headings type={'sectionName'} classname="text-center ">
               {standard_package?.package_title}
              </Headings>
            </SlantDiv>
          </Typography>

          <Typography id="modal-modal-description" className="xmd:pb-8">
            <Paragraph type="globalBold" classname="text-center">
              Watch this{' '}
              <span className="text-hover-color font-bold">5 Mins video</span>{' '}
              to undertand the application process for both hajj and umrah
              packages
            </Paragraph>
          </Typography>

          <div>
            <Image
              src={'/images/hajj.png'}
              width={100}
              height={100}
              alt="img"
              className="m-auto xmd:pb-10 md:pb-16"
            />
          </div>

          <Link href="/registration-form">
            <BtnGlobal className="md:py-[14px] xmd:px-4 sm:px-[60px] md:px-[108px] border-2 border-[#4B393B] rounded-lg m-auto text-fz-xs text-center leading-4 tracking-tight font-normal">
              Proceed to Application Page
            </BtnGlobal>
          </Link>
        </Box>
      </Modal>
    </div>
  );
}
