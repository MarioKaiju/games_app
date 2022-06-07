export const Platforms = ({ platforms }) => {
  return (
    <ul>
    {
      platforms.map((platform) => (
        <li key={platform.name}>
          { platform.name }
        </li>
      ))
    }
    </ul>
  )
}