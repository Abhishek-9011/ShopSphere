import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Updated data structure for products
const products = [
  {
    id: "1",
    title: "Premium Wireless Headphones",
    stock: 45,
    price: "$199.99",
    discountPrice: "$149.99",
    status: "In Stock",
  },
  {
    id: "2",
    title: 'Ultra HD Smart TV 55"',
    stock: 12,
    price: "$899.99",
    discountPrice: "$799.99",
    status: "Low Stock",
  },
  {
    id: "3",
    title: "Ergonomic Office Chair",
    stock: 0,
    price: "$249.99",
    discountPrice: "$199.99",
    status: "Out of Stock",
  },
  {
    id: "4",
    title: "Bluetooth Portable Speaker",
    stock: 78,
    price: "$79.99",
    discountPrice: "$59.99",
    status: "In Stock",
  },
  {
    id: "5",
    title: "Smartphone Pro Max 2023",
    stock: 23,
    price: "$1099.99",
    discountPrice: "$999.99",
    status: "In Stock",
  },
  {
    id: "6",
    title: "Wireless Charging Pad",
    stock: 56,
    price: "$39.99",
    discountPrice: "$29.99",
    status: "In Stock",
  },
  
  {
    id: "7",
    title: "4K Action Camera",
    stock: 8,
    price: "$299.99",
    discountPrice: "$249.99",
    status: "Low Stock",
  },
];

function ProductTable() {
  // Calculate total value of inventory
  const totalValue = products.reduce((sum, product) => {
    const price = parseFloat(product.price.replace("$", ""));
    return sum + price * product.stock;
  }, 0);

  return (
    <div className="rounded-md border">
      <Table>
        <TableCaption>Your current product inventory</TableCaption>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="w-[50px]">S.No</TableHead>
            <TableHead className="min-w-[200px]">Product Title</TableHead>
            <TableHead className="w-[100px]">Status</TableHead>
            <TableHead className="w-[100px]">Stock</TableHead>
            <TableHead className="w-[100px] text-right">Price</TableHead>
            <TableHead className="w-[100px] text-right">
              Discount Price
            </TableHead>
            <TableHead className="w-[150px] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product, index) => (
            <TableRow
              key={product.id}
              className={product.stock === 0 ? "bg-red-50" : ""}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell className="font-medium">{product.title}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    product.status === "In Stock"
                      ? "bg-green-100 text-green-800"
                      : product.status === "Low Stock"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {product.status}
                </span>
              </TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell className="text-right">
                <span className="line-through text-gray-500">
                  {product.price}
                </span>
              </TableCell>
              <TableCell className="text-right font-semibold text-green-600">
                {product.discountPrice}
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Dialog>
                  <DialogTrigger>Edit</DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you absolutely sure?</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger>Delete</DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you absolutely sure?</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter className="bg-gray-100">
          <TableRow>
            <TableCell colSpan={3}>Total Inventory Value</TableCell>
            <TableCell colSpan={2} className="text-right">
              {totalValue.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </TableCell>
            <TableCell colSpan={2} className="text-right">
              {products.length} products
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

const SellerProducts = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Products</h1>
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <ProductTable />
    </div>
  );
};

export default SellerProducts;
