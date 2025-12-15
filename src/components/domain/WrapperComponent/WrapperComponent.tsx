
export default function WrapperComponent({
    order,title,knowMore
}: {
    order:string,
    title:string,
    knowMore:string
}) {
  return (
    <div className='flex items-center justify-between '>
         <h1 className="font-bold py-3 text-2xl">
            <span className="px-2">
                {order} :
            </span>
            {title}
         </h1>
        <p className="underline py-2">
            {knowMore}
        </p>
    </div>
  )
}
