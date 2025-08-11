export default function Flag({ countryCode = "UK", size = "28x21", alt = "United Kingdom Flag" }){

  const src = `https://flagcdn.com/${size}/${countryCode.toLowerCase()}.png`;

  return (

    <img
      src={src}
      alt={alt}
      className="icon"
      width={size.split('x')[0]}
      height={size.split('x')[1]}
      style={{ borderRadius: 4 }}
    />
  );

}