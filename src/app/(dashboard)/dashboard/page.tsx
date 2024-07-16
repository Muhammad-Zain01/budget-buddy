import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  return (
    <main className="flex-1 w-full">
      <div className="mx-auto">
        <div className="grid gap-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-lg bg-muted p-4">
              <div className="text-2xl font-bold">12</div>
              <p className="text-sm text-muted-foreground">Total Products</p>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <div className="text-2xl font-bold">$4,230</div>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <div className="text-2xl font-bold">8</div>
              <p className="text-sm text-muted-foreground">New Customers</p>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <div className="text-2xl font-bold">92%</div>
              <p className="text-sm text-muted-foreground">
                Customer Satisfaction
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>
                  View the latest orders for your store.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Link href="#" className="font-medium" prefetch={false}>
                          #1234
                        </Link>
                      </TableCell>
                      <TableCell>
                        <time dateTime="2023-04-01">April 1, 2023</time>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">Fulfilled</Badge>
                      </TableCell>
                      <TableCell>$99.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Link href="#" className="font-medium" prefetch={false}>
                          #1233
                        </Link>
                      </TableCell>
                      <TableCell>
                        <time dateTime="2023-03-28">March 28, 2023</time>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Pending</Badge>
                      </TableCell>
                      <TableCell>$49.99</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Link href="#" className="font-medium" prefetch={false}>
                          #1232
                        </Link>
                      </TableCell>
                      <TableCell>
                        <time dateTime="2023-03-22">March 22, 2023</time>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">Fulfilled</Badge>
                      </TableCell>
                      <TableCell>$79.00</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <Link href="#" className="text-sm font-medium" prefetch={false}>
                  View all orders
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Top Products</CardTitle>
                <CardDescription>
                  The best-selling products in your store.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Sales</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Link href="#" className="font-medium" prefetch={false}>
                          Acme Headphones
                        </Link>
                      </TableCell>
                      <TableCell>120</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Link href="#" className="font-medium" prefetch={false}>
                          Acme Backpack
                        </Link>
                      </TableCell>
                      <TableCell>92</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Link href="#" className="font-medium" prefetch={false}>
                          Acme Sunglasses
                        </Link>
                      </TableCell>
                      <TableCell>84</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <Link href="#" className="text-sm font-medium" prefetch={false}>
                  View all products
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
