import Link from 'next/link';

interface CustomerLinkProps {
    name: string;
    customerId: string;
    className?: string;
}

const CustomerLink = ({ name, customerId, className = '' }: CustomerLinkProps) => {
    return (
        <Link
            href={`/customers/${customerId}`}
            className={`hover:text-primary hover:underline transition-colors ${className}`}
        >
            {name}
        </Link>
    );
};

export default CustomerLink;
