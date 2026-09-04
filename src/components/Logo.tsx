import logo from "../imports/Mask_group.png"

export default function Logo({ dark = true, className = "" }: { dark?: boolean; className?: string }) {
  return (
    <img
      src={logo}
      alt="HiringEase"
      className={`w-[158px] h-auto ${dark ? "" : "brightness-0 invert opacity-90"} ${className}`}
    />
  )
}
