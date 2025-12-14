import { MdPrint } from 'react-icons/md';

interface LogoProps {
    size?: 'sm' | 'md' | 'lg';
    showText?: boolean;
    className?: string;
    textClassName?: string;
    iconClassName?: string;
}

export default function Logo({
    size = 'md',
    showText = true,
    className = '',
    textClassName = '',
    iconClassName = ''
}: LogoProps) {
    const sizeClasses = {
        sm: {
            icon: 'text-2xl',
            text: 'text-lg',
            gap: 'gap-2'
        },
        md: {
            icon: 'text-3xl',
            text: 'text-xl',
            gap: 'gap-3'
        },
        lg: {
            icon: 'text-4xl',
            text: 'text-2xl',
            gap: 'gap-3'
        }
    };

    const sizes = sizeClasses[size];

    return (
        <div className={`flex items-center ${sizes.gap} ${className}`}>
            <MdPrint className={`${sizes.icon} ${iconClassName}`} />
            {showText && (
                <h2 className={`${sizes.text} font-bold tracking-tight ${textClassName}`}>
                    Sayan Digital
                </h2>
            )}
        </div>
    );
}
