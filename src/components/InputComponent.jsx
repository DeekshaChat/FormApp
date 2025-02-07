export default function InputComponent({label, id, error, ...props}) {
  return (
    <div className="control no-margin">
    <label htmlFor="email">{label}</label>
    <input id={id} {...props}/>
    {error && <p className="form-error">{error}</p>}
  </div>
  )
}