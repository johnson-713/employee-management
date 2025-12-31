import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

const AppAvatar = ({
  src,
  fallback,
  className,
}: {
  src: string;
  fallback: string;
  className?: string;
}) => {
  return (
    <Avatar className={className}>
      <AvatarImage src={src} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
};

export default AppAvatar;
