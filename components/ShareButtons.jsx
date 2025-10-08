'use client'

import { 
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon
 } from "react-share"

const ShareButtons = ({property}) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/properties/${property._id}`
  return (
    <>
      <h3 className="text-xl font-bold text-center pt-2"> Share this
        Property : 
        <div className="flex gap-3 justify-center pb-5">

          <FacebookShareButton url={shareUrl} quote={property.name} hastag={`#${property.type.replace(/\s/g, '')}ForRent`}>
            <FacebookIcon size={40} round={true}></FacebookIcon>
          </FacebookShareButton>

          <TwitterShareButton url={shareUrl} title={property.name} hastags={[`${property.type.replace(/\s/g, '')}ForRent`]}>
            <TwitterIcon size={40} round={true}></TwitterIcon>
          </TwitterShareButton>

          <WhatsappShareButton 
          url={shareUrl} 
          title={property.name} 
          seperator='::'>
            <WhatsappIcon size={40} round={true}></WhatsappIcon>
          </WhatsappShareButton>

          <EmailShareButton 
          url={shareUrl} 
          title={property.name} 
          body='Chekout this property'>
            <EmailIcon size={40} round={true}></EmailIcon>
          </EmailShareButton>


        </div>
      </h3>
    </>
  )
}
 
export default ShareButtons
