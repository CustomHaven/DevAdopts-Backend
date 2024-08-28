resource "aws_default_vpc" "default" {

}

data "aws_subnets" "subnet" {
    filter {
        name = "vpc-id"
        values = [aws_default_vpc.default.id]
    }
}