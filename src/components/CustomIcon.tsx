import { DownloadIcon, YoutubeIcon , CircleFadingArrowUp ,Ban,CircleX} from 'lucide-react';

type StatusIconProps = {
  youtubeVideoId: string
  status :string
}
// Rejected  Approved  Pending
const StatusIcon: React.FC<StatusIconProps> = ({ youtubeVideoId,status}) =>{
    let ytURL = "/"
    if(status === "Approved"){
        ytURL = `https://www.youtube.com/watch?v=${youtubeVideoId}`;
    }
  return (
    <>
    {status === "Approved" && 
        <a 
        href={ytURL}
        target="_blank" 
        rel="Retube"
        title="youtubelink"
        >
        <YoutubeIcon className="w-5 h-5 hover:text-red-500 cursor-pointer" />
        </a>}
    {status === "Pending" && 
        <CircleFadingArrowUp className="w-5 h-5 text-yellow-600" />
    }

    {status === "Rejected" && 
        <>
        <CircleX className="w-5 h-5 text-red-600" />
        </>
    }
    </>
  );
}

function Download({ href ,status,cloudinaryPublicID }: { href: string ,status : string,cloudinaryPublicID:string}) {
  return (
    <>
    { (status === "Approved" || !cloudinaryPublicID) && <Ban/>}
    {(status !== "Approved") && <a download
      href={href}
      target="_blank" 
      rel="noopener noreferrer"
      aria-label="Download file"
      title="Download file"
    >
      <DownloadIcon className="w-5 h-5 hover:text-gray-400 cursor-pointer" />
    </a>}
    </>
  );
}

type Download2Props = {
  href: string;
  status: string;
  cloudinaryPublicID: string;
};

function Download2({ href, status, cloudinaryPublicID }: Download2Props) {
  return (
    <>
    { (status === "Downloaded" && !cloudinaryPublicID) && <Ban/>}
    {(status !== "Sent" || cloudinaryPublicID) && <a download
      href={href}
      target="_blank" 
      rel="noopener noreferrer"
      aria-label="Download file"
      title="Download file"
    >
      <DownloadIcon className="w-5 h-5 hover:text-gray-400 cursor-pointer" />
    </a>}
    </>
  );
}


export {
  Download,
  StatusIcon,
  Download2
};
