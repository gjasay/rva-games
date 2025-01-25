import { useEffect, useState } from "react"
import supabase from "../utils/supabase"

export const Home: React.FC = () => {
  const [names, setNames] = useState<string[]>([])

  useEffect(() => {
    async function getNames() {
      const { data: test } = await supabase.from('test').select();

      if (test && test.length > 0) {
        const newNames = test.map((name) => name.name);
        setNames(newNames);
      }
    }
    getNames();
  }, []);

  return (
    <div>
      {names.map((todo) => (
        <li key={todo}>{todo}</li>
      ))}
    </div>
  )
}
