import { formatFull } from "@/helpers/formatIDR";

export default function CurrencyInput({ value, onChange, ...props }) {

    const handleInput = (e) => {
        const raw = e.target.value.replace(/\D/g, ""); 
        const parsed = raw ? parseInt(raw, 10) : 0;
        onChange(parsed); 
    };

    return (
        <input
            {...props}
            value={value ? formatFull(value) : ""}
            onChange={handleInput}
            className={`border-accent border p-2 rounded-sm ${props.className || ""}`}
        />
    );
}
